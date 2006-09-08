class ApplicationController < ActionController::Base

  append_before_filter :session_setup
  append_before_filter :link_setup

  layout 'grindable'

  ##
  # Method to determine if a user is authenticated. This might be more
  # complicated in the future.
  #
  def authenticated?
    session[:authenticated] == true
  end

  ##
  # A filter check to ensure that the person using the fund is authenticated
  # in some way or another...
  #
  def verify_identity
    # escape check
    return true if authenticated?

    # make 'em authenticate before continuing
    session[:return_to] = request.request_uri
    # nice one, bruddah. it's a route helper.
    redirect_to login_url
  end

  ##
  # Sends the user to the default url. This could either be stored in the
  # sesion or in the home_url method.
  #
  def goto_default_redirect_url
    if session[:return_to].nil?
      redirect_to home_url
    else
      redirect_to session[:return_to]
      session[:return_to] = nil
    end
  end
  
  ##
  # Redirects to the index action, useful since it is used in lots of places
  #
  def goto_index
    redirect_to :action => 'index'
  end
  
  ##
  # Adds a related link to refresh the current action
  #
  def add_refresh_link
    add_related_link 'Refresh'
  end
  
  ##
  # This will add a submenu item to be displayed
  #
  def add_related_link(*args)
    @related_links.push [ *args ]
  end

  ##
  # This will add a submenu item for a javascript function
  #
  def add_related_function(what, where)
    @related_functions.push [ what, where ]
  end
  
  ##
  # Adds an AJAX call to the submenu list
  #
  def add_remote_function(*args)
    @related_remote.push [ *args ]
  end
  
  ##
  # Ensures that the method in question was called from a form, ie. POST
  #
  def ensure_post
    return false unless request.post?
    true
  end
  
  ##
  # Just like ensure_post only for AJAX requests...
  #
  def ensure_xhr
    return false unless request.xhr?
    true
  end
  
  ##
  # This configures the @fund variable for several methods as a before_filter.
  #
  def find_fund
    return unless session[:barista] and session[:barista][:fund_id]
    @fund = Fund.find session[:barista][:fund_id].to_i unless
      session[:barista].nil?
  end

  private

  ##
  # This should ensure a minimum session environment
  #
  def session_setup
    if session[:authenticated].nil?
      session[:barista] = nil
      session[:authenticated] = false
    end
    true
  end
  
  ##
  # Creates the environment for the submenu of links
  #
  def link_setup
    @related_links ||= []
    @related_functions ||= []
    @related_remote ||= []
  end
end