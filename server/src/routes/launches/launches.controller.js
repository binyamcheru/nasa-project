const { getAllLaunches, addNewLaunch } = require('../../models/launches.model');

// why call this method to httpGetAllLaunchers beause it will directly deal with the http request and response objects, and it will be used as a callback function for the route handler in the routes file. This method will be responsible for sending the response back to the client with the list of all launches in JSON format.
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate
    || !launch.destination) {
      return res.status(400).json({
        error: 'Missing required launch property',
      });
    }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};