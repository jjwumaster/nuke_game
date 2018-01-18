class WeaponsController < ApplicationController

  def index
    @weapons = Weapon.all
    render json: @weapons, status: 200
  end

end
