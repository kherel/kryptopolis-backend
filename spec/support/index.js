import express from 'express'
import chai from 'chai'
import chaiSubset from 'chai-subset'
import sinon from 'sinon'
import nock from 'nock'
import timekeeper from 'timekeeper'
import factory from "../factory"
import request from './request'

chai.use(chaiSubset)

global.expect = chai.expect
global.sinon = sinon
global.nock = nock
global.factory = factory
global.timekeeper = timekeeper
global.app = express()
global.request = request
