MAX_ID=413

for index in $(seq 0 413); do
  echo fetching http://lauluwiki.otaniemi.info/id/$index/...
  curl "http://lauluwiki.otaniemi.info/id/$index/" > "$index.html"
  sleep 3
done
