ActionController::Routing::Routes.draw do |map|
  map.connect '', :controller => 'cafe', :action => 'index'
  map.home '', :controller => 'cafe', :action => 'index'
  map.login '/barista/login', :controller => 'barista', :action => 'identify'

  map.connect ':controller/service.wsdl', :action => 'wsdl'

  map.connect ':controller/:action/:id'
end
