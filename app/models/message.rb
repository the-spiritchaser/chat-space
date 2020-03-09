class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validetes :text, presence: true, unless: :image?
end
