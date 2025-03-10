from django.db import transaction
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ...models import Event
from ...serializers import EventFullSerializer, EventSerializer
from ...signals import events_bulk_update_done


class EventViewset(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EventFullSerializer(instance, many=False, context={"request": request})
        return Response(serializer.data)

    @action(methods=["PUT"], detail=False, permission_classes=[IsAuthenticated], url_path="set_results")
    def set_results(self, request):
        if not isinstance(request.data, dict):
            return Response({"error": "Invalid data format. Expected a dictionnary."})

        event_ids = list(request.data.keys())
        events = Event.objects.filter(id__in=event_ids)
        event_dict = {event.id: event for event in events}  # type: ignore
        errors = []
        events_to_update = []

        for event_id, scores in request.data.items():
            try:
                event = event_dict.get(int(event_id))

                if not event:
                    errors.append(f"Event with id {event_id} does not exist.")
                    continue

                if not event.time < timezone.now():
                    errors.append(f"Event with id {event_id} was not played yet.")
                    continue

                score1 = scores.get("score1")
                score2 = scores.get("score2")

                if score1 is None or score2 is None:
                    errors.append(f"Scores missing for event {event_id}")
                    continue

                if not isinstance(score1, int) or not isinstance(score2, int):
                    errors.append(f"Invalid scores for event {event_id}. Must be integers.")
                    continue

                event.score1 = score1
                event.score2 = score2
                events_to_update.append(event)
            except Exception as e:
                errors.append(f"Error updating event {event_id}: {str(e)}")

        if events_to_update:
            with transaction.atomic():
                Event.objects.bulk_update(events_to_update, ["score1", "score2"])
                events_bulk_update_done.send(sender=self.__class__, updated_events=events_to_update)
        if errors:
            return Response(
                {"message": "Some scores could not be updated", "errors": errors}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"message": "Scores updated successfully!"}, status=status.HTTP_200_OK)
