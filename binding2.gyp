{
  "targets": [
    {
      "target_name": "geography",
      "sources": [ "./lib/c/module.cc",
       "./lib/c/geography.cc"],
        "include_dirs" : [
             "<!(node -e \"require('nan')\")"
         ]
    }
  ]
}
