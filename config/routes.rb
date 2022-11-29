Rails.application.routes.draw do
  resources :course_documents
  resources :grades
  resources :submissions
  resources :discussion_posts
  resources :course_students
  resources :students
  resources :discussions
  resources :announcements
  resources :assignments
  resources :syllabus_entries
  resources :syllabuses
  resources :courses
  resources :instructors
  # route to test your configuration
end