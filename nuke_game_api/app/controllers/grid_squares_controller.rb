class GridSquaresController < ApplicationController

  def index
    @grid_squares = GridSquare.all
    render json: @grid_squares, status: 200
  end

  def update
    @grid_square = GridSquare.find(params[:id])
    @grid_square.update(grid_square_params)
  end

  def grid_square_params(*args) # change to explicitly allow certain arguments
    params.require(:grid_square).permit(args)
  end

end
