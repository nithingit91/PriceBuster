package com.pricebuster.server;
//[START all]

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;

import javax.inject.Named;

/** An endpoint class we are exposing */
@Api(name = "api",
     version = "v1",
     namespace = @ApiNamespace(ownerDomain = "pricebuster691.appspot.com",
                                ownerName = "pricebuster691.appspot.com",
                                packagePath=""))
public class API {

    /** A simple endpoint method that takes a name and says Hi back */
    @ApiMethod(name = "search")
    
    public Bean search(@Named("product") String product) {
        Bean response = new Bean();
        response.setData(product);

        return response;
    }

}
//[END all]
