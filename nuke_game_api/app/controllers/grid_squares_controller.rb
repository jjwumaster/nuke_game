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

  private

  def grid_square_params
    params.require(:grid_square).permit(:shot)
  end

end
