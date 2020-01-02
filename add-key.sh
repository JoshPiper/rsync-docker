#!/bin/sh

# Start the SSH agent if it isn't already.
if [ -z "$SSH_AGENT_PID" ]; then
  eval $(ssh-agent) > /dev/null
fi

ssh-add "$@"
