#!bin/bash

rm $IREST_PROJECT_DIR/package.json $IREST_PROJECT_DIR/.env.remote.prod 
rm -rf $IREST_PROJECT_DIR/dist $IREST_PROJECT_DIR/lib $IREST_PROJECT_DIR/node_modules
cp -r build/. $IREST_PROJECT_DIR/
cd $IREST_PROJECT_DIR
echo "switched to $IREST_PROJECT_DIR folder."
echo "starting server with pm2. Checking existing installation..."
pm2 describe irest_v2 > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
    echo "Deploying first time. Starting the server..."
    pm2 start npm --name irest_v2 -- run start:p
    pm2 save
    echo "iRest server started successfully."
else
    echo "Existing instance found. Restarting the server with new changes."
    pm2 restart irest_v2
    echo "iRest server restarted successfully."
fi
#exit 1
