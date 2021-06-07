FROM node:16

SHELL ["/bin/sh", "-c"]

ENV APP_DIR=/opt/tic-tac-toe

COPY package.json $APP_DIR/package.json
COPY yarn.lock $APP_DIR/yarn.lock
COPY .eslintrc $APP_DIR/.eslintrc
COPY src $APP_DIR/src
COPY test $APP_DIR/test

WORKDIR $APP_DIR

RUN yarn install

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "-c"]
