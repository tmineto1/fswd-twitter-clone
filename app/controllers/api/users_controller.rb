module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: {
          success: false
        }
      end
    end

    def show
      user = User.find_by(username: params[:username])

      if user
        render json: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          },
          tweets: user.tweets.order(created_at: :desc).map do |t|
            {
              id: t.id,
              body: t.message,
              created_at: t.created_at
            }
          end
        }
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    private

    

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
