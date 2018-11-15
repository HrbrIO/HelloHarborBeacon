# Hello, Harbor!

Every product needs a Hello World example. Harbor is no different. This simple app shows you just how easy it is to POST 
your monitoring data to Harbor using nothing more than an HTTP POST. No agents to install, no under-the-covers magic, just
 a POST.
 
 *Of course, we also offer more comprehensive beacons that perform monitoring magic for you, but they're open source and
 we won't be secretly sending your data to Cambridge Analytica or the like :).*
 
 ## POSTing to Harbor
 
In order to POST a monitoring message to Harbor, you need to have a few things correct to "get in the front door":
1) A registered `appVersionId`. You create this when you create an App through the online portal.
2) A registered `beaconVersionId`. You create this when add a Beacon to an App, also through the online portal.
3) Your API Key which is...wait for it...available through the online portal.

You use the above to create a properly formatted post, POST it to the beacon message endpoint, then sit back and enjoy 
your achievement.

It's all described in the `index.js` file, and check out the video tutorial coming soon.

(P.S. if your a Python person, that's coming soon.)