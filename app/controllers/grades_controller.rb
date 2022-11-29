class GradesController < ApplicationController
    before_action :find_grade, only: [:show, :update, :destroy]
    skip_before_action :admin_user, only: [:show]

    def index
        render json: Grade.all, status: :ok
    end

    def show
        render json: @grade, status: :ok
    end

    def create
        grade = Grade.create!(grade_params)
        render json: grade, status: :created
    end

    def update
        @grade.update!(grade_params)
        render json: @grade, status: :ok
    end

    def get_grade
        grade = Grade.find_by(submission_id: params[:id])
        render json: grade
    end

    def delete
        grade = Grade.find_by(submission_id: params[:id])
        grade.destroy
        head :no_content
    end

    private

    def grade_params
        params.permit(:submission_id, :grade)
    end

    def find_grade
        @grade = Grade.find(params[:id])
    end

end
