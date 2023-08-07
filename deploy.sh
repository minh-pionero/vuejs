#!/bin/bash

# Step 1: Build Vue.js project
npm run build

# Step 2: Switch to the deployment branch
git checkout build

# Step 3: Remove all existing files and folders in the deployment branch
git rm -r --ignore-unmatch *

# Step 4: Copy the contents of "dist" to the deployment branch
cp -r dist/* .

# Step 5: Add all the changes
git add .

# Step 6: Commit the changes
git commit -m "Update deployment branch with latest build"

# Step 7: Push the changes to the deployment branch on GitHub
git push origin build

# Step 8: Switch back to the main branch (or any other branch you were on)
git checkout deploy
