class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :student_name, :assignment, :grade
  # has_one :assignment
  # has_one :student
end
