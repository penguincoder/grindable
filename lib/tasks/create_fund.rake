desc "Creates the fund for managing."
task :create_fund => :environment do
  begin
    fund = Fund.new
    fund.save!
  rescue => exception
    puts "Failed: #{exception.inspect}"
  end
end
