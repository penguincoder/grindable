class BaristaController < ApplicationController

  append_before_filter :ensure_post, :only => [ 'add', 'delete', 'edit' ]
  append_before_filter :add_refresh_link, :only => [ 'index' ]
  append_before_filter :find_fund, :only => [ 'index' ]

  ##
  # Lists all of the baristas in the system
  #
  def index
    @pages, @baristas = paginate :baristas, :order => 'baristas.name ASC',
      :per_page => 10, :include => 'fund'
    add_related_function 'Create Barista',
      ("dojo.widget.byId('baristaDialog').show();" +
      "dojo.byId('barista_name').focus()")
  end
  
  ##
  # Adds a new barista to the system.
  #
  def add
    b = Barista.new params['barista']
    
    begin
      b.save!
      flash[:info] = 'Successfully created a new barista!'
    rescue => exception
      flash[:error] = "Failed to create the barista: #{exception.to_s}"
    end
    
    goto_index
  end
  
  def delete
    # not implemented yet
  end
  
  def edit
    # nothing to edit, only the password really. and there's none of that now
  end
  
  ##
  # This method will identify the user -- basically an authenticate.
  #
  def identify
    # user should probably not be here if they are already authenticated
    goto_default_redirect_url if authenticated?

    if request.post?
      # mirror mirror on the wall, who is da funkiest of them all?
      user_to_auth = Barista.find :first, :conditions => [ "name = ?",
          params[:name] ]

      if user_to_auth.nil?
        # busted
        flash.now[:error] = "You're going to have to try harder than that."
      else
        # ballin'
        session[:authenticated] = true
        session[:barista] = user_to_auth
        flash[:info] = "Welcome to the Grindable!"

        # shot callin'
        goto_default_redirect_url
      end
    end
  end

  ##
  # This method should reset the user state to basic -- a deauthenticate.
  #
  def anonymize
    # blank out all knowledge of the user
    reset_session

    # go home
    goto_default_redirect_url
  end
end
