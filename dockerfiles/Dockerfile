FROM hub.fif.tech/base/node:18-latest

ARG BUILDPATH

ENV BUILDPATH $BUILDPATH
ENV NODE_ENV test

WORKDIR /home/node

USER root

COPY $BUILDPATH ./

EXPOSE 3000

CMD ["npm", "start"]
