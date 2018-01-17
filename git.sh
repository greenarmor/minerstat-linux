#! /usr/bin/bash
git config --global user.email "test@test.com"
git config --global user.name "test"
git pull
git add * -f
git commit -a -m "AutoUpdate"
git merge
