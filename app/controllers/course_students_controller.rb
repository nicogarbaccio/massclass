class CourseStudentsController < ApplicationController
    before_action :find_course_student, only: [:show, :create, :update, :destroy]
    skip_before_action :admin_user, only: [:index, :show, :create]

    def index
        render json: CourseStudent.all, status: :ok
    end

    def show
        render json: @course_student, status: :ok
    end

    def create
        course = Course.find_by(code: params[:code])
        course_student = CourseStudent.create!(student_id: params[:student_id], course_id: course.id)
        render json: course_student, status: :created
    end

    def update
        @course_student.update!(course_student_params)
        render json: @course_student, status: :ok
    end

    def destroy
        @course_student.destroy
        head :no_content
    end

    private

    def course_student_params
        params.permit(:code, :student_id, :course_id)
    end

    def find_course_student
        @course_student = CourseStudent.find(params[:id])
    end

end
