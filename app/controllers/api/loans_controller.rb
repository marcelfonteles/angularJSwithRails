module Api
  class LoansController < ApplicationController

    def index
    end

    def create
      @loan = Loan.new(loans_params)
      if @loan.save
        render json: { status: 200, data: @loan, message: 'Emprestimo cadastrado com sucesso'}
      else
        render json: { status: 400, message: 'Não foi possível cadastrar o emprestimo'}
      end
    end

    def destroy
      @loan = Loan.find(params[:id])
      if @loan.destroy
        render json: { status: 200, data: @loan, message: 'Emprestimo Apagado com sucesso'}
      else
        render json: { status: 400, message: 'Não foi possível apagar o emprestimo' }
      end
    end

    private

    def loans_params
      params.require(:loan).permit(:store, :amount, :date, :portions, :customer_id)
    end
    
  end
end 