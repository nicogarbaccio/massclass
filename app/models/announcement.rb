class Announcement < ApplicationRecord
  belongs_to :course
  has_one :instructor, though: :course
  has_many :students, through: :course
end
