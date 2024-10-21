from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import smtplib

def send_html_email(subject, recipient_list, email_template, email_data):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = settings.DEFAULT_FROM_EMAIL
    msg['To'] = ', '.join(recipient_list)

    html_content = render_to_string(email_template, email_data)
    text_content = strip_tags(html_content)

    part1 = MIMEText(text_content, 'plain')
    part2 = MIMEText(html_content, 'html')

    msg.attach(part1)
    msg.attach(part2)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HPST_PASSWORD)

    server.sendmail(settings.EMAIL_HOST_USER, recipient_list, msg.as_string())
    server.quit()