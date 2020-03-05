# Chat-Space データベース設計

## users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|VARCHAR(255)|null: false, unique: true|
|password|VARCHAR(255)|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages

## groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|text|text||
|image|string||

### Association
- belongs_to :user
- belongs_to :group
