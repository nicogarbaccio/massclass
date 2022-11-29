class CourseDocumentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :course
end
