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

    kim_jong_un = Player.create({
      player_number: 1,
      name: "Kim Jong Un",
      description: "Supreme Glorious Commander-God of Best Korea"
      })

    donald_trump = Player.create({
      player_number: 2,
      name: "Donald J. Trump",
      description: "Commander in Chief of the United States Armed Forces."
      })

    trident_ii = Weapon.create({
        name: "Trident II",
        description: "Trident II Submarine-Based Thermonuclear Weapon. Mark V MIRV carries twelve 475 kiloton warheads.",
        shots: 5,
        x_dim: 4,
        y_dim: 4,
        success_rate: 1.00,
        player: donald_trump
      })

    b83 = Weapon.create({
        name: "B83 Thermonuclear Bomb",
        description: "Variable-yield unguided bomb deployed by the B2 Spirit Bomber. Maximum yield of 1.2 megatons.",
        shots: 10,
        x_dim: 3,
        y_dim: 3,
        success_rate: 1.00,
        player: donald_trump
      })

    b81 = Weapon.create({
        name: "B81 Thermonuclear Bomb",
        description: "Low-to-intermediate-yield tactical nuclear weapon. Maximum yield of 340 kilotons.",
        shots: 20,
        x_dim: 2,
        y_dim: 2,
        success_rate: 1.00,
        player: donald_trump
      })

    hwasong_7 = Weapon.create({
        name: "Hwasong 7",
        description: "",
        shots: 100,
        x_dim: 1,
        y_dim: 1,
        success_rate: 0.90,
        player: kim_jong_un
      })

    hwasong_10 = Weapon.create({
        name: "Hwasong 10",
        description: "",
        shots: 10,
        x_dim: 2,
        y_dim: 2,
        success_rate: 0.50,
        player: kim_jong_un
      })

    hwasong_15 = Weapon.create({
        name: "Hwasong 15",
        description: "",
        shots: 5,
        x_dim: 3,
        y_dim: 3,
        success_rate: 0.20,
        player: kim_jong_un
      })

  end

  private

  def grid_square_params
    params.require(:grid_square).permit(:shot, :has_player)
  end

end
