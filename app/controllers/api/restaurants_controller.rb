class Api::RestaurantsController < ApplicationController
    def index 
        if params[:search] 
            if params[:search][:city]
                @restaurants = params[:search][:city] == ["All"] ? 
                    Restaurant.all : 
                    Restaurant.where(city: params[:search][:city])
            else 
                 @restaurants = Restaurant.all
            end

            if params[:search][:price]
                @restaurants = @restaurants.where(:price => params[:search][:price])
            end

            if params[:search][:cuisines]
                @restaurants = @restaurants.where(:cuisine => params[:search][:cuisines])
            end
        else 
            @restaurants = Restaurant.all
        end
        render :index
    end 

    def show 
        @restaurant = Restaurant.find(params[:id])
    end 


    private 
    def narrowSearch(array)
        res = []
        array.each {|keyword| res.concat(Restaurant.search_by_key(keyword))}
        counts = Hash.new(0)
        res.each{ |ele| counts[ele] += 1}
        counts.select{|v,count| count > 1}.keys
    end
end
