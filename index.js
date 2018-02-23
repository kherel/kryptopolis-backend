require('babel-register')

const express = require('express')
const listen = require("./app/app").listen

listen(express())
