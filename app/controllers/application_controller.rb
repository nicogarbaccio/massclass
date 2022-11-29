class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authorized_user, :admin_user

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    # Current user actions
    def current_user
        if (session[:is_instructor] === 1)
            @current_user ||= Instructor.find_by(id: session[:user_id])
        else
            @current_user ||= Student.find_by(id: session[:user_id])
        end
    end

    # Authorized current user actions
    def authorized_user
        render json: { error: "Not authorized!" }, status: :unauthorized unless current_user
    end

    def admin_user
        render json: { error: "Not authorized!" }, status: :unauthorized unless current_user.admin
    end

    private

    def render_not_found(ex)
        render json: { error: "#{ex.model} not found" }, status: :not_found
    end

    def render_invalid(ex)
        render json: { errors: ex.record.errors.full_messages }, status: :unprocessable_entity
    end

end
