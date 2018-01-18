class PlayersController < ApplicationController

  def index
    @players = Player.all
    render json: @players, status: 200
  end

end
