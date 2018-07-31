package com.bazaarvoice.emodb.uac;

import com.bazaarvoice.emodb.uac.resources.UACResource;
import com.codahale.metrics.servlets.PingServlet;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class UACServerApplication extends Application<UACServerConfiguration> {

    public static void main(final String[] args) throws Exception {
        new UACServerApplication().run(args);
    }

    @Override
    public String getName() {
        return "Emodb UAC UI";
    }

    @Override
    public void initialize(final Bootstrap<UACServerConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/web/assets/", "/", "index.html"));
    }

    public void run(UACServerConfiguration configuration, Environment environment) throws Exception {
        environment.servlets().addServlet("/ping", new PingServlet());
        environment.jersey().setUrlPattern("/api/*");
        environment.jersey().register(new UACResource("http://localhost:8080", "local_default"));
    }
}