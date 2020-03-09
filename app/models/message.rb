class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validetes :text, :image, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

end
