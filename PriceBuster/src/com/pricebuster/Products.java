
 //[START begin]
package com.pricebuster;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.response.NotFoundException;
import com.google.appengine.api.users.User;

import java.util.ArrayList;

import javax.inject.Named;

import java.net.MalformedURLException;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

//[END begin]
 //[START api_def]

/**
 * Defines v1 of an API, which provides simple "product" methods.
 */
@Api(name = "pricebuster691",
    version = "v1",
    scopes = {Constants.EMAIL_SCOPE},
    clientIds = {Constants.WEB_CLIENT_ID, Constants.ANDROID_CLIENT_ID, Constants.IOS_CLIENT_ID},
    audiences = {Constants.ANDROID_AUDIENCE}
)
public class Products {

  public static ArrayList<Item> products = new ArrayList<Item>();

  static {
    products.add(new Item("Iphone"));
    products.add(new Item("Ipad"));
  }
//[END api_def]
//[START getproducts]

  public ArrayList<Item> getProduct(@Named("input") String input) throws NotFoundException {
    try {
//      return products.get(id);   	

    	
		// If only numbers entered, Find by UPC
    	String regex = "\\d+";
    	String uri = "";
    	
		if (input.matches(regex)) {

			// Build Walmart.com URI
			uri = "http://api.walmartlabs.com/v1/items?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&upc="
					+ input;
		} else {
			// Find by Name
			// Build Walmart.com URI
			uri = "http://api.walmartlabs.com/v1/search?apiKey=ct3xn4fv3zbnv46ww7s6dnc7&query="
					+ input;
		};
		try {

        URL url = new URL(uri);
        
        
        BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
        String line;

        while ((line = reader.readLine()) != null) {
			
	/*			"id" : results[i].upc,
				"name" : results[i].name,
				"store" : "Walmart",
				"price" : results[i].salePrice,
				"rate" : "10",
				"image" : results[i].thumbnailImage,
				"url" : results[i].productUrl*/
        }
        reader.close();

} catch (MalformedURLException e) {
    // ...
} catch (IOException e) {
    // ...
}
  
    } catch (IndexOutOfBoundsException e) {
      throw new NotFoundException("Product not found: " + input);
    }
    return products;
  }

  public ArrayList<Item> listProduct() {
	  
    return products;
  }
//[END getproducts]
  
//[START updateproducts]

  @ApiMethod(name = "products.update", httpMethod = "post")
  public Item updateProduct(@Named("times") Integer times, Item product) {
    Item response = new Item();
    StringBuilder responseBuilder = new StringBuilder();
    for (int i = 0; i < times; i++) {
      responseBuilder.append(product.getMessage());
    }
    response.setMessage(responseBuilder.toString());
    return response;
  }
//[END updateproducts]
//[START auth] 

  @ApiMethod(name = "products.authed", path = "helloproduct/authed")
  public Item authedProduct(User user) {
    Item response = new Item("hello " + user.getEmail());
    return response;
  }
//[END auth]
}
