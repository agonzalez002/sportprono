from django.core.paginator import Paginator
from django.db import transaction
from django.dispatch import receiver

from .models import Bet
from .signals import events_bulk_update_done


@receiver(events_bulk_update_done)
def on_bulk_update_done(sender, updated_events, **kwargs):
    events_id = [event.id for event in updated_events]
    bets = Bet.objects.filter(event_id__in=events_id).select_related("user", "event")
    event_scores_dict = {
        event.id: (event.score1, event.score2, event.team1_bonus, event.team2_bonus) for event in updated_events
    }
    paginator = Paginator(bets, 500)

    for page_num in paginator.page_range:
        page_bets = paginator.page(page_num).object_list
        bets_to_update = []

        for bet in page_bets:
            points = 0
            event_scores = event_scores_dict.get(bet.event_id)
            if event_scores:
                score1, score2, team1_bonus, team2_bonus = event_scores

                if team1_bonus and bet.team1_bonus:
                    points += 1
                elif team2_bonus and bet.team2_bonus:
                    points += 1

                if (bet.score1 > bet.score2) and (score1 > score2):
                    points += 4
                elif (bet.score2 > bet.score1) and (score2 > score1):
                    points += 4

                if (bet.score1 == bet.score2) and (score1 == score2):
                    points += 2

                bet.points = points
                bets_to_update.append(bet)

        if bets_to_update:
            with transaction.atomic():
                Bet.objects.bulk_update(bets_to_update, ["points"])
        print(f"Processed page {page_num}/{paginator.num_pages} with {len(bets_to_update)} bets updated.")
    print(f"Bulk update done for events {events_id}. Total pages processed: {paginator.num_pages}.")
