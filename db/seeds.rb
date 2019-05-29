# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Limpando banco....."
Event.all.each do |event|
  event.destroy
end

Loan.all.each do |loan|
  loan.destroy
end

Customer.all.each do |customer|
  customer.destroy
end
puts "Limpando banco.....[OK]"

puts "Populando banco....."
1.upto(10) do |i|
  Event.create(name: "Event #{i}",
               description: "It's sample event with number #{i}",
               event_date: Date.today + rand(3).months,
               place: "Random place number #{i}")
end

1.upto(10) do |i|
  Customer.create(name: "Customer #{i}",
                  address: "Street #{i}, City #{i}",
                  cpf: '000.000.000-00',
                  phone: '+55 85 9 9999-9999')
end

100.times do 
  Loan.create(store: 'Loja 1', amount: 1250, portions: 3, date: DateTime.now, customer_id: Customer.all.sample.id)
end
puts "Populando banco.....[OK]"