#!/bin/bash

EXCLUDE_LIST=(".git" "$(basename "$0")")

EXCLUDE_ARGS=""
for EXCLUDE in "${EXCLUDE_LIST[@]}"; do
  EXCLUDE_ARGS+="-e $EXCLUDE "
done

neocities push $EXCLUDE_ARGS .
