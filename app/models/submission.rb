class Submission < ApplicationRecord
  belongs_to :assignment
  belongs_to :student

  has_one :course_student, through: :student
  has_one :grade, dependent: :destroy

  def student_name
    "#{student.last_name}, #{student.first_name}"
  end
end
