export default {
    "name": "weapon_common",
    "prob": 1.0,
    "children": [
      {
        "name": "weapon_melee",
        "prob": 0.75,
        "children": [
          {
            "name": "weapon_one_handed",
            "prob": 0.65,
            "children": [
              {
                "name": "weapon_sword_like",
                "prob": 0.60
              },
              {
                "name": "weapon_no_sword_like",
                "prob": 0.40
              }
            ]
          },
          {
            "name": "weapon_two_handed",
            "prob": 0.35
          }
        ]
      },
      {
        "name": "weapon_ranged",
        "prob": 0.25,
        "children": [
          {
            "name": "weapon_projectile",
            "prob": 0.75
          },
          {
            "name": "weapon_throwable",
            "prob": 0.25
          }
        ]
      }
    ]
  };