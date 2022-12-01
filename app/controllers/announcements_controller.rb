class AnnouncementsController < ApplicationController
    before_action :find_announcement, only: [:show, :update, :destroy]
    skip_before_action :admin_user, only: [:index, :show]

    def index
        render json: Announcement.all, status: :ok
    end

    def show
        render json: @announcement, status: :ok
    end

    def create
        announcement = Announcement.create!(announcement_params)
        # if announcement.save
        #     PostMailer.post_email(announcement.students, announcement.course.title).deliver_now
        # end
        render json: announcement, status: :created
    end

    private

    def announcement_params
        params.permit(:course_id, :title, :body, :pinned)
    end

    def find_announcement
        @announcement = Announcement.find(params[:id])
    end

end
