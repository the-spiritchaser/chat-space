json.user_name @message.user.name
json.text @message.text
json.image @message.image_url
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.id @message.id