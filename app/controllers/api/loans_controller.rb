module Api
  class LoansController < ApplicationController

    def index
    end

    def destroy
      @loan = Loan.find(params[:id])
      if @loan.destroy
        render json: { status: 200, data: @loan, message: 'Emprestimo Apagado com sucesso'}
      else
        render json: { status: 400, message: 'Não foi possível apagar o emprestimo' }
      end
    end
    
  end
end 