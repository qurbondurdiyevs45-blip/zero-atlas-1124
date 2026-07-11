// Zero Atlas — service 2
package main

import (
  "encoding/json"
  "log"
  "net/http"
  "sync/atomic"
  "time"
)

type Health struct { OK bool `json:"ok"`; Uptime string `json:"uptime"` }

var start = time.Now()
var hits atomic.Uint64

func health(w http.ResponseWriter, r *http.Request) {
  hits.Add(1)
  w.Header().Set("Content-Type","application/json")
  _ = json.NewEncoder(w).Encode(Health{OK:true, Uptime: time.Since(start).String()})
}

func main() {
  http.HandleFunc("/health", health)
  log.Println("zero-atlas-1124 listening on :8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}