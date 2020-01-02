#!/bin/sh

if [ ! -z "$SSH_AGENT_PID" ]; then
	ssh-agent -k
	exit $?
elif [ -f "/tmp/ssh-agent-id" ]; then
	SSH_AGENT_PID=$(cat /tmp/ssh-agent-id)
	ssh-agent -k
	exit $?
else
	echo "SSH_AGENT_PID not set, /tmp/ssh-agent-id doesn't exist!" 1>&2
	exit 1
fi