import type { Translations } from '@/types/translations'

export const translations: Translations = {
  zh: {
    nav: {
      home: "THU-电动车-101",
      buyingGuide: "购买指南",
      usageGuide: "使用指南",
      repairMaintenance: "维修保养",
      lawsSafety: "法规安全",
      faq: "常见问题"
    },
    home: {
      welcome: {
        mainTitle: "你的T大电动车一站式信息平台",
        subTitle: "One-Stop Scooter Information Platform",
        startButton: "开始探索"
      },
      sections: {
        buyingGuide: {
          title: "购买指南",
          description: "找到适合您的电动车和购买渠道"
        },
        usageGuide: {
          title: "使用指南",
          description: "了解校园的停车规则和如何给电动车充电"
        },
        repairMaintenance: {
          title: "维修与保养",
          description: "获取维修点信息和保养电动车的建议"
        },
        lawsSafety: {
          title: "法规与安全",
          description: "了解校园和北京市的电动车法规"
        },
        faq: {
          title: "常见问题",
          description: "获取电动车相关的常见问题解答"
        },
        learnMore: "了解更多"
      }
    },
    chat: {
      welcome: {
        title: "我是THU老司机.AI，有问题可以先问我",
        subtitle: "AI目前仍为实验性功能，请将以下页面作为信息的获取方式"
      },
      input: {
        placeholder: "🛵给清华老司机发消息"
      },
      button: {
        stop: "点击停止输出"
      },
      avatar: {
        alt: "AI头像"
      }
    },
    footer: {
      about: {
        title: "关于我们",
        description: "THU-电动车-101 是清华大学首个智能电动车信息服务平台"
      },
      contact: {
        title: "联系方式",
        email: "邮箱：support@thu-scooter-101.site",
        wechat: "微信公众号：THU Scooter 101"
      },
      links: {
        title: "快速链接",
        feedback: "反馈建议",
        privacy: "隐私政策"
      },
      copyright: "© 2024 THU-电动车-101. 保留所有权利。"
    },
    buyingGuide: {
      title: "电动车购买指南",
      subtitle: "找到适合您的电动车和最佳购买渠道",
      recommendedScooters: {
        title: "推荐电动车型号",
        subtitle: "看学姐都在骑什么电动车",
        details: {
          brand: "品牌",
          price: "价格",
          range: "续航里程",
          seniorSays: "学长学姐说"
        }
      },
      purchaseChannels: {
        title: "购买渠道推荐",
        subtitle: "哪里能买到电动车？",
        details: {
          location: "位置",
          contact: "联系方式",
          priceRange: "价格区间"
        }
      },
      registration: {
        title: "北京电动车注册挂牌指南",
        subtitle: "如何合法上牌",
        process: {
          title: "注册流程",
          steps: [
            "准备所需材料",
            "前往车辆管理所",
            "填写申请表",
            "缴纳费用",
            "车辆验车",
            "等待审核",
            "领取号牌",
            "安装号牌"
          ]
        },
        notices: {
          title: "注意事项",
          items: [
            "确保您的电动车符合北京市电动自行车管理规定,不得超标或非法改装",
            "办理过程中如有问题,可咨询车管所工作人员或拨打咨询电话",
            "请关注北京市交通管理局官方网站,了解最新政策和办理流程变化"
          ]
        }
      }
    },
    usageGuide: {
      title: "电动车使用指南",
      subtitle: "了解校园内的停车规则、充电站位置安全骑行建议",
      warning: "⚠️请不要携带电动车电池进入公寓！不要在公寓内给电动车电池充电！⚠️😠",
      parkingRules: {
        title: "停车规则",
        subtitle: "———若要在清华内骑电动车，请务必一定要严格遵守以下规则：",
        forbiddenAreas: {
          title: "⚠️禁止停车区域👮",
          areas: [
            "紫荆公寓宿舍楼下楼外，严禁停车",
            "教学楼特定区域(如六教大楼旁不能停车，请在停车时注看告示)",
            "古建筑旁（清华学堂，明斋，大礼堂……）"
          ]
        },
        penalties: {
          title: "违规停车处置方式和处罚标准👮",
          items: [
            "停在违规区域的电动车将被拖走",
            "第一次被拖走：需要持生活卡签取车单并签署承诺书",
            "第二次被拖走：需要签署违纪单并递交情况说明",
            "重要提醒：违规次数是累计的，不会重置",
            "为避免处罚，请务必将电动车停放在定区域 💪"
          ]
        },
        allowedAreas: "允许停车区域"
      },
      chargingStations: {
        title: "主要充电站位置：",
        sectionTitle: "充电站位置",
        mobileNote: "将以下内容的地址一键复制到您的地图中，即可快速导航到充电站。充电桩信息持续更新，如有补充可点击右下角反馈🙏",
        details: {
          price: "¥{price}/次",
          copied: "已复制!"
        }
      },
      chargingMasters: {
        title: "充电师傅服务信息",
        subtitle: "———充电师傅以在指定位置直接把电池取走后，隔天早上送回，单次服务费用较贵，一复制联系方式（微信）。充电师傅相关信息持续更新，如有补充可点击右下角反馈🙏",
        error: "错误: {error}"
      },
      safetyTips: {
        title: "安全骑行建议",
        tips: [
          {
            title: "如果条件允许始终佩戴头盔（并非强制）",
            description: "头盔可以在发生意外时保护您的头部，大降低严重伤害的风险。"
          },
          {
            title: "遵守交通规则",
            description: "遵守交通信号，注意行人安全，不要逆行或闯红灯。"
          },
          {
            title: "保持车速在15km/h以下",
            description: "校园内请控制车速，保证自己和他人的安全，尤其是在十字路口，一定要减速，清华大部分车祸都发生在十字路口。"
          },
          {
            title: "夜间骑行开启车灯",
            description: "确保他能看您，同时提高您的视野范围。"
          },
          {
            title: "定期检查车辆状况",
            description: "确保刹车、轮胎等关键部件处于良好状态。"
          }
        ]
      }
    }
  },
  en: {
    nav: {
      home: "THU-Scooter-101",
      buyingGuide: "Buying Guide",
      usageGuide: "Usage Guide",
      repairMaintenance: "Repair & Maintenance",
      lawsSafety: "Laws & Safety",
      faq: "FAQ"
    },
    home: {
      welcome: {
        mainTitle: "Your One-Stop Scooter Information Platform at THU",
        subTitle: "Everything You Need to Know About Campus Scooters",
        startButton: "Get Started"
      },
      sections: {
        buyingGuide: {
          title: "Buying Guide",
          description: "Find the right scooter and where to buy it"
        },
        usageGuide: {
          title: "Usage Guide",
          description: "Learn about parking rules and charging stations"
        },
        repairMaintenance: {
          title: "Maintenance",
          description: "Get repair information and maintenance tips"
        },
        lawsSafety: {
          title: "Safety & Rules",
          description: "Understand campus and Beijing scooter regulations"
        },
        faq: {
          title: "FAQ",
          description: "Get answers to common questions"
        },
        learnMore: "Learn More"
      }
    },
    chat: {
      welcome: {
        title: "I'm THU Driver.AI, Ask Me Anything",
        subtitle: "AI is still experimental, please refer to the following pages for information"
      },
      input: {
        placeholder: "Message THU Driver"
      },
      button: {
        stop: "Click to stop"
      },
      avatar: {
        alt: "AI Avatar"
      }
    },
    footer: {
      about: {
        title: "About Us",
        description: "THU-Scooter-101 is the first smart e-bike information service platform at Tsinghua University"
      },
      contact: {
        title: "Contact",
        email: "Email: support@thu-scooter-101.site",
        wechat: "WeChat: THU Scooter 101"
      },
      links: {
        title: "Quick Links",
        feedback: "Feedback",
        privacy: "Privacy Policy"
      },
      copyright: "© 2024 THU-Scooter-101. All rights reserved."
    },
    buyingGuide: {
      title: "E-Bike Buying Guide",
      subtitle: "Find Your Perfect E-Bike and Best Purchase Channels",
      recommendedScooters: {
        title: "Recommended Models",
        subtitle: "See What Senior Students Are Riding",
        details: {
          brand: "Brand",
          price: "Price",
          range: "Range",
          seniorSays: "Senior Students Say"
        }
      },
      purchaseChannels: {
        title: "Purchase Channels",
        subtitle: "Where to Buy Your E-Bike?",
        details: {
          location: "Location",
          contact: "Contact",
          priceRange: "Price Range"
        }
      },
      registration: {
        title: "Beijing E-Bike Registration Guide",
        subtitle: "How to Get Legal License Plate",
        process: {
          title: "Registration Process",
          steps: [
            "Prepare Required Documents",
            "Visit Vehicle Management Office",
            "Fill Registration Form",
            "Pay Fees",
            "Vehicle Inspection",
            "Wait for Review",
            "Collect License Plate",
            "Install Plate"
          ]
        },
        notices: {
          title: "Important Notes",
          items: [
            "Ensure your e-bike meets Beijing regulations, no modifications allowed",
            "Contact staff or hotline for assistance during the process",
            "Stay updated with latest policies on Beijing Traffic Management Bureau website"
          ]
        }
      }
    },
    usageGuide: {
      title: "E-Bike Usage Guide",
      subtitle: "Learn about campus parking rules, charging stations, and safe riding tips",
      warning: "⚠️DO NOT bring e-bike batteries into apartments! DO NOT charge batteries inside apartments!⚠️😠",
      parkingRules: {
        title: "Parking Rules",
        subtitle: "———If you want to ride an e-bike at THU, please strictly follow these rules:",
        forbiddenAreas: {
          title: "⚠️No Parking Areas👮",
          areas: [
            "Outside Zijing Apartments, strictly no parking",
            "Specific areas near teaching buildings (e.g., no parking near Building 6, please check notices)",
            "Near historic buildings (Tsinghua Xuetang, Mingzhai, Great Hall...)"
          ]
        },
        penalties: {
          title: "Parking Violation Penalties👮",
          items: [
            "Illegally parked e-bikes will be towed",
            "First violation: Must present student card to retrieve bike and sign a commitment letter",
            "Second violation: Must sign a disciplinary notice and submit a written explanation",
            "Important: Violation counts are cumulative and do not reset",
            "To avoid penalties, please park only in designated areas 💪"
          ]
        },
        allowedAreas: "Allowed Parking Areas"
      },
      chargingStations: {
        title: "Main Charging Station Locations:",
        sectionTitle: "Charging Stations",
        mobileNote: "Copy these addresses to your map app for quick navigation. Charging station info is continuously updated, click the feedback button in the bottom right to contribute🙏",
        details: {
          price: "¥{price}/time",
          copied: "Copied!"
        }
      },
      chargingMasters: {
        title: "Charging Service Providers",
        subtitle: "———Service providers can pick up your battery and return it the next morning. Service fee applies. Copy WeChat contact info. Information is continuously updated, click the feedback button in the bottom right to contribute🙏",
        error: "Error: {error}"
      },
      safetyTips: {
        title: "Safe Riding Tips",
        tips: [
          {
            title: "Always Wear a Helmet When Possible (Not Mandatory)",
            description: "A helmet can protect your head and significantly reduce the risk of serious injury in accidents."
          },
          {
            title: "Follow Traffic Rules",
            description: "Obey traffic signals, watch out for pedestrians, don't ride against traffic or run red lights."
          },
          {
            title: "Keep Speed Below 15km/h",
            description: "Control your speed on campus for everyone's safety, especially at intersections. Most accidents at THU happen at intersections."
          },
          {
            title: "Use Lights When Riding at Night",
            description: "Ensure others can see you and improve your visibility."
          },
          {
            title: "Regular Vehicle Inspection",
            description: "Ensure critical components like brakes and tires are in good condition."
          }
        ]
      }
    }
  }
} 