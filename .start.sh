#!bin/bash

echo "Installing Dependency. Please wait.."
npm ci
if [ $? -eq 1 ]
then
  echo "Failed to download dependencies! Please check above error!"
  exit 1
else
  echo "Triggering production build..."
  npm run build
  if [ $? -eq 1 ]
  then
    echo "Failed to build artifact! Please check above error!"
    exit 1
  else
    echo "Cleaning build directory..."
    rm -rf build
    # create build if not exists
    echo "Creating build folder..."
    mkdir -p build
    echo "copying artifact to build folder..."
    cp -r lib dist node_modules package.json .env.prod build/
    echo "artifact folder created successfully."

    echo "switching to ./build folder."
    cd ./build
    echo "switched to ./build folder."

    echo "starting server with pm2. Checking existing installation..."
    pm2 describe iRest_automated > /dev/null
    RUNNING=$?

    if [ "${RUNNING}" -ne 0 ]; then
      echo "Deploying first time. Starting the server..."
      pm2 start npm --name iRest_automated -- run start:p
      echo "iRest server started successfully."
    else
      echo "Existing instance found. Restarting the server with new changes."
      pm2 restart iRest_automated
      echo "iRest server restarted successfully."
    fi
  fi
fi

exit 1
