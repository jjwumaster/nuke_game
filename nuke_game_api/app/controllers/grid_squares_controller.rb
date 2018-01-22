class GridSquaresController < ApplicationController

  def index
    @grid_squares = GridSquare.all
    render json: @grid_squares, status: 200
  end

  def update
    @grid_square = GridSquare.find(params[:id])
    @grid_square.update(grid_square_params)
    render json: @grid_square, status: 200
  end

  def end_game
    @grid_squares = GridSquare.where(shot: true).or(GridSquare.where(has_player: true))
    @grid_squares.each do |gridsquare|
      gridsquare.update({shot: false, has_player: false})
    end

    ActiveRecord::Base.connection.execute("TRUNCATE Players CASCADE")
  end

  private

  def grid_square_params
    params.require(:grid_square).permit(:shot, :has_player)
  end

end
