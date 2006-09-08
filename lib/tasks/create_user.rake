desc "Makes an user without the use of the web interface"
task :create_user => :environment do
  begin
    account = Barista.new
    print "Give me a username: "
    account.name = STDIN.gets.chomp
    #print "Password: "
    #password = STDIN.gets.chomp
    #account.set_password password, password
    #account.activated = true
    account.save_with_validation false
  rescue => exception
    puts "Failed: #{exception.inspect}"
  end
end
