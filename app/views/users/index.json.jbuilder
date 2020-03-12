josn.array! @users do |user|
  json.user_name = user.name
  json.usr_id = user.id
end